import Image from "next/image";
import Tilt from "./Tilt";
import Reveal from "./Reveal";
import { SIcon, SERVICE_ICON } from "./Icons";
import { SERVICE_IMG, photo } from "@/data/ads";

export default function ServiceGrid({ services, notes = {} }) {
  return (
    <div className="svc-grid">
      {services.map((s, i) => {
        const im = SERVICE_IMG[s] && photo(SERVICE_IMG[s]);
        return (
          <Reveal key={s} delay={(i % 3) * 0.08}>
            <Tilt className={`svc ${im ? "has-img" : ""}`} style={{ height: "100%" }}>
              {im && (
                <div className="svc-img">
                  <Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className="ico"><SIcon name={SERVICE_ICON[s]} /></span>
                </div>
              )}
              <div className="svc-body">
                {!im && <span className="ico"><SIcon name={SERVICE_ICON[s]} /></span>}
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s}</h3>
                {notes[s] && <p>{notes[s]}</p>}
              </div>
            </Tilt>
          </Reveal>
        );
      })}
    </div>
  );
}
