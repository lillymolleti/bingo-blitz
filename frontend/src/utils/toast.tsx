import { ReactNode } from "react";
import {Bounce, toast, ToastTransition} from "react-toastify"

interface ToastProps{
  message:string | ReactNode;
  type:"success"|"error"|"warn";
  position?:"top-center"|"bottom-center"|"top-right"|undefined;
  hideProgressBar?:boolean;
  closeOnClick?: boolean;
  draggable?: boolean;
  pauseOnHover?:boolean;
  autoClose?: number | undefined;
  progress?: undefined;
  transition?: ToastTransition | undefined,
  theme?:"light"|"dark",

}

export function customizedToast (props:ToastProps) {
    if(props.type==="success"){
      return toast.success(props.message, {
        position: "top-center",
        autoClose:props.autoClose||3000,
        hideProgressBar: props.hideProgressBar || false,
        closeOnClick: props.closeOnClick || false,
        pauseOnHover: props.pauseOnHover || true,
        draggable: props.draggable || true,
        progress: props.progress || undefined,
        transition: props.transition||Bounce,
        theme:props.theme || "dark"
      });
    }else if (props.type==="error"){
      return toast.error(props.message, {
        position: "top-center",
        autoClose:props.autoClose||3000,
        hideProgressBar: props.hideProgressBar || false,
        closeOnClick: props.closeOnClick || false,
        pauseOnHover: props.pauseOnHover || true,
        draggable: props.draggable || true,
        progress: props.progress || undefined,
        transition: props.transition||Bounce,
        theme:props.theme ||"dark"
      });
    }else if (props.type==="warn"){
      return toast.warn(props.message, {
        position: "top-center",
        autoClose:props.autoClose||3000,
        hideProgressBar: props.hideProgressBar || false,
        closeOnClick: props.closeOnClick || false,
        pauseOnHover: props.pauseOnHover || true,
        draggable: props.draggable || true,
        progress: props.progress || undefined,
        transition: props.transition||Bounce,
        theme:props.theme ||"dark"
      });
    }
}
