'use client';
const Loading = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ backgroundColor: '#e0e0e0', height: '24px', width: '60%', marginBottom: '12px', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
      <div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '90%', marginBottom: '8px', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
      <div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '80%', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
