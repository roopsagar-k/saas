import React from "react";

interface Props {
    showTextArea: boolean;
    setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
    setCommentId: React.Dispatch<React.SetStateAction<string>>;
    id: string;
}

const CommentSectionInteractionPannel: React.FC<Props> = ({ setShowTextArea, setCommentId, id, showTextArea }) => {
  return (
    <div className="mt-4">
      <div className="flex gap-4">
        <div>
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 cursor-pointer hover:scale-110 hover:stroke-primary"
            width="1"
            height="1"
          >
            <path
              d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
              fill="#A8B3CF"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 cursor-pointer hover:scale-110 hover:stroke-primary transform rotate-180"
            width="1"
            height="1"
          >
            <path
              d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
              fill="#A8B3CF"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div onClick={() => {
            setShowTextArea(!showTextArea);
            setCommentId(id)
        }} className="peer flex gap-2 items-center cursor-pointer hover:text-primary text-[#A8B3CF]">
          <svg  
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 cursor-pointer peer-hover:stroke-primary"
          >
            <path
              d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="cursor-pointer text-[#A8B3CF]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 curosr-pointer hover:text-primary"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.302 3.805a2.75 2.75 0 10-3.89 3.89L11.5 8.78h-1.142a7.367 7.367 0 00-7.078 5.323l-1.233 4.271c-.315 1.09 1.068 1.849 1.818.999l2.287-2.59a5.25 5.25 0 013.935-1.775h1.422l-1.095 1.095a2.75 2.75 0 103.889 3.889l6.149-6.15a2.75 2.75 0 000-3.889l-6.15-6.149zm-.473 9.92a.75.75 0 01.012 1.073l-2.367 2.366a1.25 1.25 0 101.767 1.768l6.15-6.15a1.25 1.25 0 000-1.767l-6.15-6.149a1.25 1.25 0 10-1.768 1.768L13.74 8.9a.75.75 0 01-.396 1.38.753.753 0 01-.065 0h-2.922a5.867 5.867 0 00-5.637 4.24l-.694 2.403 1-1.133a6.75 6.75 0 015.06-2.283h3.216c.205 0 .391.083.527.216z"
              fill="currentColor"
            ></path>
          </svg>
        </div>  
        <div className="peer text-[#A8B3CF] cursor-pointer hover:text-primary flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 peer-hover:stroke-primary cursor-pointer"
          >
            <path
              d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CommentSectionInteractionPannel;
