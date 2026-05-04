import { useState } from "react";
import Avatar from "./Avatar";

export default function Bubble({ msg, isMe, user, clump, T }){
  const [hov, setHov] = useState(false);
  const isImg = msg.type === "image";
  const meBgIsGradient = typeof T.meBg === "string" && T.meBg.startsWith("linear");

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex", gap:10,
        flexDirection: isMe ? "row-reverse" : "row",
        alignItems:"flex-end",
        marginBottom: clump ? 3 : 16,
      }}
    >
      {/* avatar col — always 36px wide so bubbles stay aligned */}
      {/* <div  style={{width:36, flexShrink:0, display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
        {!isMe && !clump && (
          <Avatar user={user} size={34} surfaceColor={T.bg}/>
        )}
      </div> */}

      {/* content col */}
      <div style={{maxWidth:"60%", display:"flex", flexDirection:"column", alignItems: isMe ? "flex-end" : "flex-start"}}>
        {/* sender name */}
        {!isMe && !clump && (
          <span style={{
            fontSize:11, fontWeight:600, marginBottom:4,
            color:user.palTxt, fontFamily:"'Inter',sans-serif",
            letterSpacing:"0.01em",
          }}>{user.name.split(" ")[0]}</span>
        )}

        {/* bubble */}
        {isImg ? (
          <div style={{
            borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            overflow:"hidden",
            border:`1px solid ${T.border}`,
            boxShadow: hov ? `0 6px 20px rgba(0,0,0,0.10)` : "0 1px 4px rgba(0,0,0,0.06)",
            transform: hov ? "translateY(-1px)" : "none",
            transition:"transform 0.15s, box-shadow 0.15s",
          }}>
            <img src={msg.src} alt="photo" style={{display:"block", maxWidth:220, maxHeight:180, objectFit:"cover"}}/>
            <div style={{
              padding:"5px 12px",
              background: isMe ? (meBgIsGradient ? "#C0365A" : T.meBg) : T.thBg,
              borderTop:`1px solid ${T.border}`,
              display:"flex", alignItems:"center", gap:5,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke={isMe?"rgba(255,255,255,0.65)":T.inkFaint} strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{fontSize:11, color: isMe?"rgba(255,255,255,0.65)":T.inkFaint, fontFamily:"'Inter',sans-serif"}}>
                camera
              </span>
            </div>
          </div>
        ) : (
          <div style={{
            padding:"10px 15px",
            borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            background: isMe ? T.meBg : T.thBg,
            color: isMe ? T.meTxt : T.thTxt,
            fontSize:14, lineHeight:1.6,
            fontFamily:"'Inter',sans-serif", fontWeight:400,
            border: isMe ? "none" : `1px solid ${T.border}`,
            boxShadow: hov ? `0 6px 20px rgba(0,0,0,0.09)` : "0 1px 4px rgba(0,0,0,0.05)",
            transform: hov ? "translateY(-1px)" : "none",
            transition:"transform 0.15s, box-shadow 0.15s",
            wordBreak:"break-word",
          }}>{msg.text}</div>
        )}

        {/* meta row */}
        <div style={{display:"flex", alignItems:"center", gap:5, marginTop:4, flexDirection: isMe ? "row-reverse" : "row"}}>
          <span style={{fontSize:10, color:T.inkFaint, fontFamily:"'Inter',sans-serif"}}>{msg.time}</span>
          {msg.rx && msg.rx.map((r,i)=>(
            <span key={i} style={{
              background:T.surfaceAlt, border:`1px solid ${T.border}`,
              borderRadius:20, padding:"1px 7px",
              fontSize:11, color:T.inkMid, cursor:"pointer",
              fontFamily:"'Inter',sans-serif",
            }}>{r.e} {r.n}</span>
          ))}
        </div>
      </div>
    </div>
  );
};