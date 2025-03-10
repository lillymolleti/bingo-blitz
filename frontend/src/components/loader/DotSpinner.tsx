
interface DotSpinnerProps{
    size?:string,
    color?:string
  }
  export default function DotSpinner({size="40px",color="rgb(241, 204, 80)"}:DotSpinnerProps) {
    return (
      <div className="text-white text-xl flex justify-center items-center min-h-[90vh]">
        <div className="container" style={{
          "--uib-color":color,
          "--uib-size":size
        }  as React.CSSProperties}
        >
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }





