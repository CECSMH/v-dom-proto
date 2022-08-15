import d from "../core"

export default function Input (props){
    return (
        <input type="text" value={props?.value || '1'}></input>
    )
}