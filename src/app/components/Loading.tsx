export const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50">
      <video
        src="/loading.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-40"
      />
      <p className="text-primary font-semibold mt-4">{message}</p>
    </div>
  );
};
