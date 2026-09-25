// YouTube přehrávač, který se načte až po kliknutí na náhled
const ID_REGEX = /^[\w-]{11}$/;

function createIframe(id, title) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  iframe.title = title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  return iframe;
}

function createPlayButton(id, title) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video__play';
  button.setAttribute('aria-label', `Přehrát video: ${title}`);

  const img = document.createElement('img');
  img.className = 'video__thumb';
  img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  img.alt = '';
  img.width = 480;
  img.height = 360;
  img.loading = 'lazy';

  // Ikona play (dekorativní)
  const icon = document.createElement('span');
  icon.className = 'video__icon';
  icon.setAttribute('aria-hidden', 'true');

  button.append(img, icon);
  return button;
}

export function initVideo() {
  const players = document.querySelectorAll('.video[data-video-id]');
  if (players.length === 0) return;

  players.forEach((player) => {
    const id = player.dataset.videoId;
    const title = player.dataset.videoTitle || 'YouTube video';
    // Neplatné ID → zůstane odkaz na YouTube
    if (!ID_REGEX.test(id)) return;

    const button = createPlayButton(id, title);
    button.addEventListener('click', () => {
      const iframe = createIframe(id, title);
      button.replaceWith(iframe);
      iframe.focus();
    });

    player.replaceChildren(button);
  });
}
