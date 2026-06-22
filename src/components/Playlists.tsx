import { motion } from "framer-motion";
import { musicPlaylists } from "../data/portfolio";

// Apple Music's official embed widget lives on embed.music.apple.com.
// Public playlist links use music.apple.com, so swap the host.
function toEmbedUrl(url: string): string {
  return url.replace("https://music.apple.com", "https://embed.music.apple.com");
}

export default function Playlists() {
  if (!musicPlaylists.length) return null;

  return (
    <section
      id="playlists"
      className="bg-transparent px-6 py-16 md:px-12 md:py-24"
      aria-label="Apple Music playlists"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl space-y-4 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Listening
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
            On rotation.
          </h2>
          <p className="text-base leading-7 text-gray-600">
            A couple of playlists I keep coming back to on Apple Music. Press play right here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {musicPlaylists.map((playlist) => (
            <motion.div
              key={playlist.appleMusicUrl}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <iframe
                title={`${playlist.title} on Apple Music`}
                src={toEmbedUrl(playlist.appleMusicUrl)}
                loading="lazy"
                allow="autoplay *; encrypted-media *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                className="h-[450px] w-full rounded-2xl border border-black/10 bg-white/70 shadow-sm"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
