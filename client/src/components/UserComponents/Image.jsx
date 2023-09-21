export default function Image({ src, ...rest }) {

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  src =
    src && src.includes("https://")
      ? src
      : `${backendUrl}/Uploads/` + src;
  return <img {...rest} src={src} alt={""} />;
}
