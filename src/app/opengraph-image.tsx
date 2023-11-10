import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Better Practicing";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const workSans = fetch(
    new URL("/public/WorkSans-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 96,
          // background image gradient from ffefce to white
          background: "linear-gradient(135deg, #fff2d7 0%, #fffefe 100%)",
          // background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 128,
          paddingRight: 128,
          paddingLeft: 128,
          paddingBottom: 16 + 128,
        }}
      >
        <svg
          version="1.1"
          viewBox="0 0 512 512"
          aria-hidden="true"
          style={{ width: 384, height: 384 }}
        >
          <g>
            <path
              d="M464,112h48V96H176V48c0-8.844-7.156-16-16-16s-16,7.156-16,16v48H0v16h144v64H0v16h144v23.766   c-9.438-4.813-20.281-7.766-32-7.766c-32.219,0-58.609,20.906-63.078,48H0v16h48.922c4.469,27.094,30.859,48,63.078,48   s58.609-20.906,63.078-48H256v64H0v16h256v23.766c-9.438-4.813-20.281-7.766-32-7.766c-32.219,0-58.609,20.906-63.078,48H0v16   h160.922c4.469,27.094,30.859,48,63.078,48c32.219,0,58.609-20.906,63.078-48H512v-16H288v-64h48.922   c4.469,27.094,30.859,48,63.078,48s58.609-20.906,63.078-48H512v-16h-48v-64h48v-16h-48v-64h48v-16h-48v-24.734V112z M256.563,192   c-0.155,1.281-0.563,2.484-0.563,3.797V224v32h-80v-64H256.563z M432,295.766c-9.453-4.813-20.281-7.766-32-7.766   c-32.219,0-58.609,20.906-63.078,48H288v-64h144V295.766z M432,256H290.672l138.656-64H432V256z M176,176v-64h230.016   l-131.813,56.234c-4.109,1.75-7.453,4.563-10.328,7.766H176L176,176z"
              fill="currentColor"
            />
          </g>
        </svg>
        Practice Better
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Work Sans",
          data: await workSans,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
