import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./watch.css";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackIcon />
        Home
      </div>
      <video
        className="video"
        autoPlay 
        progress= "true"
        controls
        src="https://youtu.be/t86sKsR4pnk"
      />
    </div>
  );
}