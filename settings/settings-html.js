/* settings-html.js — Modal HTML builder */

export const ACCENT_COLORS = [
  { key: 'red',    hex: '#E50914', label: 'Улаан'      },
  { key: 'blue',   hex: '#1E88E5', label: 'Цэнхэр'     },
  { key: 'green',  hex: '#43A047', label: 'Ногоон'      },
  { key: 'gold',   hex: '#FFC107', label: 'Алтан'       },
  { key: 'pink',   hex: '#EC407A', label: 'Ягаан'       },
  { key: 'purple', hex: '#AB47BC', label: 'Нил ягаан'   },
  { key: 'teal',   hex: '#00BCD4', label: 'Хөх ногоон'  },
];

const QUALITY_OPTS = ['auto', '1080p', '720p', '480p', '360p'];
const FONT_OPTS    = [['small','Жижиг'], ['medium','Дунд'], ['large','Том']];
const LANG_OPTS    = [['mn','Монгол'], ['en','English']];

function toggle(id, key, S) {
  return `<label class="s-toggle" aria-label="${key}">
    <input type="checkbox" id="${id}" ${S[key] ? 'checked' : ''} onchange="window._nabooSettings.set('${key}', this.checked)">
    <div class="s-toggle-track"><div class="s-toggle-thumb"></div></div>
  </label>`;
}

function select(id, key, opts, S) {
  const optsHtml = opts.map(([v,l]) => `<option value="${v}" ${S[key]===v?'selected':''}>${l}</option>`).join('');
  return `<select class="s-select" id="${id}" onchange="window._nabooSettings.set('${key}', this.value)">${optsHtml}</select>`;
}

function row(iconClass, emoji, title, sub, control) {
  return `<div class="s-row">
    <div class="s-row-icon ${iconClass}">${emoji}</div>
    <div class="s-row-text">
      <div class="s-row-title">${title}</div>
      ${sub ? `<div class="s-row-sub">${sub}</div>` : ''}
    </div>
    ${control}
  </div>`;
}

export function buildModalHTML(S) {
  const colorDots = ACCENT_COLORS.map(c =>
    `<div class="s-color-dot ${S.accent===c.key?'active':''}" style="background:${c.hex}" title="${c.label}" onclick="window._nabooSettings.setAccent('${c.key}', this)"></div>`
  ).join('');

  return `
<div id="settingsModal" onclick="if(event.target===this)window._nabooSettings.close()">
  <div class="settings-sheet" role="dialog" aria-label="Тохиргоо">
    <div class="settings-handle"></div>
    <div class="settings-header">
      <div class="settings-title">⚙️ Тохиргоо</div>
      <button class="settings-close" onclick="window._nabooSettings.close()">✕</button>
    </div>
    <div class="settings-body">

      <div class="s-section">
        <div class="s-section-label">🎨 Гадаад байдал</div>
        <div class="s-row">
          <div class="s-row-icon red">🎨</div>
          <div class="s-row-text">
            <div class="s-row-title">Accent өнгө</div>
            <div class="s-row-sub">Үндсэн өнгийг сонгох</div>
            <div class="s-colors" style="margin-top:10px;">${colorDots}</div>
          </div>
        </div>
        ${row('purple','🔤','Фонт хэмжээ','Текстийн том жижгийг тохируулах', select('s-fontSize','fontSize',FONT_OPTS,S))}
        ${row('blue','✨','Хөдөлгөөн / Animation','Шилжилт, нэвтрэлтийн эффект', toggle('s-animations','animations',S))}
      </div>

      <div class="s-section">
        <div class="s-section-label">🎬 Тоглуулагч</div>
        ${row('red','▶️','Автомат тоглуулах','Дараагийн анги автоматаар тоглох', toggle('s-autoplay','autoplay',S))}
        ${row('blue','📡','HLS / P2P Stream','P2P сүлжээний дамжуулалт', toggle('s-hls','hls',S))}
        ${row('teal','💬','Хадмал орчуулга','Subtitle идэвхжүүлэх', toggle('s-subtitles','subtitles',S))}
        ${row('gold','📺','Чанар','Видео тоглуулах чанарыг сонгох', select('s-quality','quality',QUALITY_OPTS.map(q=>[q,q==='auto'?'Автомат':q]),S))}
        <div class="s-row" style="flex-direction:column; align-items:flex-start; cursor:default;">
          <div style="display:flex;align-items:center;gap:12px;width:100%;margin-bottom:10px;">
            <div class="s-row-icon green">🔊</div>
            <div class="s-row-text">
              <div class="s-row-title">Анхдагч дуу</div>
              <div class="s-row-sub" id="s-vol-label">${S.volume}%</div>
            </div>
          </div>
          <input type="range" class="s-slider" id="s-volume" min="0" max="100" value="${S.volume}" oninput="window._nabooSettings.setVol(this.value)">
          <div class="s-slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
        </div>
      </div>

      <div class="s-section">
        <div class="s-section-label">🌐 Хэл & Бүс нутаг</div>
        ${row('blue','🌍','Интерфэйс хэл','Платформын харуулах хэл', select('s-language','language',LANG_OPTS,S))}
      </div>

      <div class="s-section">
        <div class="s-section-label">🔔 Мэдэгдэл</div>
        ${row('gold','🔔','Push Notification','Шинэ кино гарахад мэдэгдэх', toggle('s-notifications','notifications',S))}
      </div>

      <div class="s-section">
        <div class="s-section-label">🗑️ Өгөгдөл</div>
        <button class="s-danger-btn" onclick="window._nabooSettings.clearHistory()">🕐 Үзсэн түүх цэвэрлэх</button>
        <button class="s-danger-btn" onclick="window._nabooSettings.clearWatchlist()">❤️ Хадгалсан жагсаалт устгах</button>
      </div>

      <div class="s-section">
        <div class="s-section-label">ℹ️ Тухай</div>
        ${row('red','🚀','Nabooshy','2026 · Монголын хамгийн ухаалаг платформ','')}
        ${row('blue','📱','PWA дэмжлэг','Апп болгож суулгах боломжтой','')}
        ${row('teal','🔗','Холбоо барих','@oroodvz Telegram',
          `<a href="https://t.me/oroodvz" target="_blank" rel="noopener" style="color:var(--red);font-size:12px;font-weight:600;white-space:nowrap;">Telegram →</a>`)}
      </div>

      <div class="s-version"><span>⚡ Nabooshy v2.0 · 2026</span></div>
    </div>
  </div>
</div>`;
}
