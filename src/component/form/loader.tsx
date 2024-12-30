export default function Loader({ dark }: { dark?: boolean }) {
    return <div className={`loaderBtn ${dark?'loaderBtn__dark':''}`}></div>
}