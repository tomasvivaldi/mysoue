interface LoadingBoxProps {
  spinnerClassName?: string;
  containerClassName?: string;
}

function LoadingBox({
  spinnerClassName = "",
  containerClassName = "",
}: LoadingBoxProps) {
  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div
        className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-900 ${spinnerClassName}`}
      ></div>
    </div>
  );
}

export default LoadingBox;
