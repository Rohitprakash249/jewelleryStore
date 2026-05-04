export default function Avatar({ user, size=40, showDot=false, surfaceColor }){
  return (
    <div style={{position:"relative",flexShrink:0,width:size,height:size}}>
      <div style={{
        width:size, height:size, borderRadius:"50%",
        background:user.palBg, color:user.palTxt,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontWeight:700, fontSize:Math.round(size*0.33),
        fontFamily:"'Inter',sans-serif", letterSpacing:"-0.02em",
        userSelect:"none",
      }}>{user.init}</div>
      {showDot && (
        <div style={{
          position:"absolute", bottom:size>32?1:0, right:size>32?1:0,
          width:Math.round(size*0.26), height:Math.round(size*0.26),
          borderRadius:"50%", background:user._dotColor,
          border:`2px solid ${surfaceColor||"#fff"}`,
        }}/>
      )}
    </div>
  );
};