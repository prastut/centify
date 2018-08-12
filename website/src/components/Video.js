import React from "react";

const Video = ({ src, height, width, customStyles }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
					<video
						muted
						autoplay
						playsinline
						loop
						class="${customStyles}""
						src="${src}"
					/>
			`
    }}
  />
);

export default Video;
