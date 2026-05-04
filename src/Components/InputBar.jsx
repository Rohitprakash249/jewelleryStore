import { useCallback, useRef, useState } from "react";

export default function InputBar({ T, recipientName, onSend, onOpenCamera }){
  const [text, setText] = useState("");
  const taRef = useRef(null);

  const handleSend = useCallback(()=>{
    const val = text.trim();
    if(!val) return;
    onSend(val);
    setText("");
    if(taRef.current){ taRef.current.style.height="auto"; }
  },[text, onSend]);

  const handleKey = useCallback(e=>{
    if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); handleSend(); }
  },[handleSend]);

  const handleChange = useCallback(e=>{ setText(e.target.value); },[]);

  const handleInput = useCallback(e=>{
    e.target.style.height="auto";
    e.target.style.height=Math.min(e.target.scrollHeight,108)+"px";
  },[]);

  const meBgIsGradient = typeof T.meBg==="string" && T.meBg.startsWith("linear");
  const accentBg = meBgIsGradient ? `linear-gradient(135deg,${T.accent},#8B2070)` : T.meBg;

  const ibStyle = {
    background:"none", border:"none", cursor:"pointer",
    borderRadius:9, padding:7, width:33, height:33, flexShrink:0,
    display:"flex", alignItems:"center", justifyContent:"center",
    color:T.inkMid, transition:"background 0.15s, color 0.15s",
  };

  return (
    <div style={{padding:"10px 16px 16px", background:T.surface, borderTop:`1px solid ${T.border}`}}>
      <div style={{
        display:"flex", alignItems:"flex-end", gap:6,
        background:T.surfaceAlt, border:`1px solid ${T.border}`,
        borderRadius:20, padding:"8px 8px 8px 14px",
        transition:"border-color 0.2s",
      }}
        onFocusCapture={e=>e.currentTarget.style.borderColor=T.borderFocus}
        onBlurCapture={e=>e.currentTarget.style.borderColor=T.border}
      >
        {/* emoji btn */}
        <button style={ibStyle}
          onMouseEnter={e=>{e.currentTarget.style.background=T.hover;e.currentTarget.style.color=T.ink;}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=T.inkMid;}}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* camera btn */}
        <button style={ibStyle} onClick={onOpenCamera}
          onMouseEnter={e=>{e.currentTarget.style.background=T.hover;e.currentTarget.style.color=T.ink;}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=T.inkMid;}}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </button>

        {/* textarea */}
        <textarea
          ref={taRef}
          rows={1}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKey}
          onInput={handleInput}
          placeholder={`Message ${recipientName}…`}
          style={{
            flex:1, background:"transparent", border:"none", outline:"none",
            fontFamily:"'Inter',sans-serif", fontSize:14, color:T.ink,
            lineHeight:1.55, resize:"none", maxHeight:108,
            overflowY:"auto", paddingTop:4, paddingBottom:4, alignSelf:"center",
          }}
        />

        {/* attach btn */}
        <button style={ibStyle}
          onMouseEnter={e=>{e.currentTarget.style.background=T.hover;e.currentTarget.style.color=T.ink;}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=T.inkMid;}}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>

        {/* send */}
        <button onClick={handleSend} style={{
          width:36, height:36, borderRadius:"50%", border:"none",
          background:accentBg, color:"#fff", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", transition:"transform 0.15s, box-shadow 0.15s",
          boxShadow:`0 2px 10px ${T.accent}55`,
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.boxShadow=`0 4px 18px ${T.accent}70`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 2px 10px ${T.accent}55`;}}
          onMouseDown={e=>e.currentTarget.style.transform="scale(0.93)"}
          onMouseUp={e=>e.currentTarget.style.transform="scale(1.1)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <p style={{marginTop:5, textAlign:"center", fontSize:10, color:T.inkGhost, fontFamily:"'Inter',sans-serif"}}>
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};