export default function Divider() {
  return (
    <div className="mx-6 md:mx-12 h-px relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="absolute top-0 left-[30%] right-[30%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.30), transparent)',
        }}
      />
    </div>
  );
}
