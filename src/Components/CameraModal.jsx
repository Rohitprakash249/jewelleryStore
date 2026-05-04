import { useCallback, useEffect, useRef, useState } from "react";

export default function CameraModal({ T, onClose, onCapture }){
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [err,     setErr    ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let cancelled = false;
    navigator.mediaDevices?.getUserMedia({video:{facingMode:"user",width:{ideal:640},height:{ideal:480}},audio:false})
      .then(stream=>{
        if(cancelled){ stream.getTracks().forEach(t=>t.stop()); return; }
        streamRef.current = stream;
        if(videoRef.current){
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = ()=>{ setLoading(false); videoRef.current?.play(); };
        }
      })
      .catch(()=>{ if(!cancelled){ setErr("Camera access denied or not available."); setLoading(false); }});
    return ()=>{
      cancelled = true;
      streamRef.current?.getTracks().forEach(t=>t.stop());
    };
  },[]);

  const capture = useCallback(()=>{
    const v=videoRef.current, c=canvasRef.current;
    if(!v||!c) return;
    c.width=v.videoWidth||640; c.height=v.videoHeight||480;
    c.getContext("2d").drawImage(v,0,0,c.width,c.height);
    setPreview(c.toDataURL("image/jpeg",0.88));
    streamRef.current?.getTracks().forEach(t=>t.stop());
  },[]);

  const retake = useCallback(()=>{
    setPreview(null); setLoading(true);
    navigator.mediaDevices?.getUserMedia({video:{facingMode:"user"},audio:false})
      .then(stream=>{
        streamRef.current=stream;
        if(videoRef.current){
          videoRef.current.srcObject=stream;
          videoRef.current.onloadedmetadata=()=>{ setLoading(false); videoRef.current?.play(); };
        }
      }).catch(()=>{ setErr("Camera access denied."); setLoading(false); });
  },[]);

  const send = useCallback(()=>{ if(preview){ onCapture(preview); onClose(); }}, [preview,onCapture,onClose]);

  const meBgIsGradient = typeof T.meBg==="string" && T.meBg.startsWith("linear");
  const accentColor = meBgIsGradient ? T.accent : T.meBg;

  return(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{
      position:"fixed", inset:0,
      background:"rgba(0,0,0,0.45)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:300, backdropFilter:"blur(6px)",
    }}>
      <div style={{
        background:T.surface, borderRadius:24, padding:24,
        width:340, boxShadow:"0 24px 72px rgba(0,0,0,0.22)",
        border:`1px solid ${T.border}`,
        display:"flex", flexDirection:"column", gap:16,
      }}>
        {/* header */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{
              width:34, height:34, borderRadius:10,
              background:T.accentSoft,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <span style={{fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:15, color:T.ink}}>Take a photo</span>
          </div>
          <button onClick={onClose} style={{
            background:"none", border:"none", cursor:"pointer",
            padding:6, borderRadius:8, color:T.inkMid,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"background 0.15s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=T.hover}
            onMouseLeave={e=>e.currentTarget.style.background="none"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* viewport */}
        <div style={{
          borderRadius:14, overflow:"hidden", background:"#111",
          aspectRatio:"4/3",
          display:"flex", alignItems:"center", justifyContent:"center",
          position:"relative",
        }}>
          {err ? (
            <div style={{
              color:"#888", fontSize:13, fontFamily:"'Inter',sans-serif",
              textAlign:"center", padding:"20px 24px", lineHeight:1.6,
            }}>{err}<br/><span style={{fontSize:11,color:"#666"}}>Please allow camera access in your browser settings.</span></div>
          ) : preview ? (
            <img src={preview} alt="preview" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
          ) : (
            <>
              <video ref={videoRef} style={{width:"100%", height:"100%", objectFit:"cover"}} muted playsInline/>
              {loading && (
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.5)"}}>
                  <span style={{color:"#ccc",fontSize:12,fontFamily:"'Inter',sans-serif"}}>Starting camera…</span>
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} style={{display:"none"}}/>
        </div>

        {/* buttons */}
        {!err && (
          <div style={{display:"flex", gap:10}}>
            {!preview ? (
              <button onClick={capture} style={{
                flex:1, padding:"12px 0",
                background: meBgIsGradient ? `linear-gradient(135deg,${T.accent},#8B2070)` : T.accent,
                color:"#fff", border:"none", borderRadius:12,
                cursor:"pointer", fontFamily:"'Inter',sans-serif",
                fontWeight:600, fontSize:14,
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                transition:"opacity 0.15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                disabled={loading}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                {loading ? "Please wait…" : "Capture"}
              </button>
            ) : (
              <>
                <button onClick={retake} style={{
                  flex:1, padding:"12px 0",
                  background:T.surfaceAlt, color:T.inkMid,
                  border:`1px solid ${T.border}`, borderRadius:12,
                  cursor:"pointer", fontFamily:"'Inter',sans-serif",
                  fontWeight:600, fontSize:14, transition:"background 0.15s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background=T.hover}
                  onMouseLeave={e=>e.currentTarget.style.background=T.surfaceAlt}
                >Retake</button>
                <button onClick={send} style={{
                  flex:1, padding:"12px 0",
                  background: meBgIsGradient ? `linear-gradient(135deg,${T.accent},#8B2070)` : T.accent,
                  color:"#fff", border:"none", borderRadius:12,
                  cursor:"pointer", fontFamily:"'Inter',sans-serif",
                  fontWeight:600, fontSize:14, transition:"opacity 0.15s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                >Send photo</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};