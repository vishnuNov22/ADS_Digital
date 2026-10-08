import Image from "next/image";
import { stock } from "@/data/ads";

// Animated content wall — design placeholders that show the kind of content ADS produces.
// Contains no metrics, likes or follower numbers.
const TILES = [
  { t: "type", text: "Creative Solutions." },
  { t: "img", id: "social-feed" },
  { t: "img", id: "creator-camera" },
  { t: "type chrome", text: "Brand Promotion" },
  { t: "img", src: "/ads-chrome.jpg", w: 1080, h: 1080 },
  { t: "type dark", text: "Reels & Video" },
  { t: "img", id: "studio-shoot" },
  { t: "img", id: "phone-apps" },
  { t: "type", text: "Grow Your Brand." },
  { t: "img", id: "production-crew" },
  { t: "type chrome", text: "Meta & Google Ads" },
  { t: "img", id: "social-scroll" },
];

function Post({ tile }) {
  return (
    <div className="post">
      {tile.t === "img" ? (
        <div className="ph"><Image src={tile.id ? stock(tile.id).src : tile.src} alt="" width={tile.id ? stock(tile.id).w : tile.w} height={tile.id ? stock(tile.id).h : tile.h} sizes="240px" /></div>
      ) : (
        <div className={`ph ${tile.t}`}>{tile.text}</div>
      )}
      <div className="meta"><i /><span>ADS Digitals</span><span className="acts"><b /><b /></span></div>
    </div>
  );
}

export default function SocialWall() {
  const cols = [0, 1, 2, 3].map((c) => TILES.filter((_, i) => i % 4 === c));
  return (
    <div className="wall" aria-hidden="true" style={{ perspective: 1400 }}>
      <div className="wall-cols">
        {cols.map((col, ci) => (
          <div className="wall-col" key={ci}>
            {[...col, ...col, ...col, ...col].map((t, i) => <Post key={i} tile={t} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
