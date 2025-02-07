const VINES_BASE_URL = "https://vines.s3.amazonaws.com";

const POPULAR_VINES_URL = `${VINES_BASE_URL}/static/timelines/popular.json`;

export { VINES_BASE_URL, POPULAR_VINES_URL };

const fetchPopularVines = async () => {
  try {
    const response = await fetch(POPULAR_VINES_URL);

    if (!response.ok) {
      throw new Error(`failed fetching popular vines - ${response.status}`);
    }

    const data = await response.json();

    const popularVines = data.records.map((record) => {
      return {
        videoUrl: record.videoUrl.replace(
          "v.cdn.vine.co",
          "vines.s3.amazonaws.com"
        ),
        username: record.username,
        description: record.description,
      };
    });

    return popularVines;
  } catch (error) {
    throw new Error(`failed fetching popular vines - ${error}`);
  }
};

const addVideo = (videoSrc, userName) => {
  const videoContainer = document.getElementById("video-container");

  const videoDiv = document.createElement("div");
  videoDiv.className = "video";

  const videoElement = document.createElement("video");
  videoElement.controls = true;

  const sourceElement = document.createElement("source");
  sourceElement.src = videoSrc;
  sourceElement.type = "video/mp4";

  videoElement.appendChild(sourceElement);
  videoDiv.appendChild(videoElement);

  const userParagraph = document.createElement("p");
  userParagraph.textContent = userName;
  videoDiv.appendChild(userParagraph);
  
  videoContainer.appendChild(videoDiv);
};

window.addEventListener("load", async () => {
  const popularVines = await fetchPopularVines();

  popularVines.forEach((vine) => {
    addVideo(vine.videoUrl, vine.username);
  });
});
