import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const heroRef = useRef<HTMLElement>(null)
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationId: number

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.05
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.05
      setRenderPos({ x: currentPos.current.x, y: currentPos.current.y })
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  useEffect(() => {
    if (activeTab !== 'home') return

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      const clampedX = Math.max(-1, Math.min(1, x))
      const clampedY = Math.max(-1, Math.min(1, y))
      targetPos.current = { x: clampedX, y: clampedY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [activeTab])

  const getParallaxStyle = (depth: number) => ({
    transform: `translate(${renderPos.x * depth}px, ${renderPos.y * depth}px)`,
  })

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <section className="hero" ref={heroRef}>
            <div className="hero-bg-image" style={getParallaxStyle(15)}></div>
            <div className="hero-overlay"></div>
            <div className="hero-scanlines"></div>
            <div className="hero-particles" style={getParallaxStyle(-30)}></div>
            <div className="hero-glow" style={getParallaxStyle(-50)}></div>
            <div className="hero-content" style={getParallaxStyle(-15)}>
              <div className="hero-badge">Classic MMORPG</div>
              <h1>Lineage 2</h1>
              <p className="subtitle">Возрождение легенды</p>
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/EKhShKU9O-I?autoplay=1" 
                  title="Lineage 2 Trailer" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <p className="hero-desc">
                Присоединяйся к тысячам игроков в эпическом фэнтези мире.<br/>
                Выбери свой путь: стань героем или завоевателем.
              </p>
              <div className="cta-buttons">
                <button className="btn-primary">
                  <span>Начать играть</span>
                  <div className="btn-glow"></div>
                </button>
                <button className="btn-secondary">
                  <span>Найти сервер</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">15K+</span>
                  <span className="stat-label">Игроков онлайн</span>
                </div>
                <div className="stat">
                  <span className="stat-value">6</span>
                  <span className="stat-label">Расс</span>
                </div>
                <div className="stat">
                  <span className="stat-value">40+</span>
                  <span className="stat-label">Рейд боссов</span>
                </div>
              </div>
            </div>
          </section>
        )
      case 'news':
        return (
          <section className="page-hero" ref={heroRef}>
            <div className="hero-bg-image" style={getParallaxStyle(8)}></div>
            <div className="hero-overlay"></div>
            <div className="page-content">
              <h2>Новости</h2>
              <div className="news-list">
              <article className="news-item">
                <span className="news-date">26.02.2026</span>
                <h3>Обновление Lineage 2: Eternal Chronicle</h3>
                <p>Новая глава легенды начинается! Знакомьтесь с обновлёнными подземельями и механиками.</p>
              </article>
              <article className="news-item">
                <span className="news-date">20.02.2026</span>
                <h3>Турнир "Winter Championship 2026"</h3>
                <p>Приглашаем всех игроков принять участие в крупнейшем турнире года!</p>
              </article>
              <article className="news-item">
                <span className="news-date">15.02.2026</span>
                <h3>Релиз нового сервера "Classic Interlude"</h3>
                <p>Откройте для себя классический интерлюд с сбалансированными механиками и дружелюбным комьюнити.</p>
              </article>
            </div>
            </div>
          </section>
        )
      case 'files':
        return (
          <section className="page-hero" ref={heroRef}>
            <div className="hero-bg-image" style={getParallaxStyle(8)}></div>
            <div className="hero-overlay"></div>
            <div className="page-content">
              <h2>Файлы</h2>
              <p>Скачать игровые файлы, патчи и дополнения</p>
              <div className="files-list">
              <div className="file-item">
                <span className="file-icon">📦</span>
                <div className="file-info">
                  <h4>Клиент игры</h4>
                  <p>Полный игровой клиент - 15 ГБ</p>
                </div>
                <button className="btn-download">Скачать</button>
              </div>
              <div className="file-item">
                <span className="file-icon">🗜️</span>
                <div className="file-info">
                  <h4>Patch v2.5</h4>
                  <p>Обновление до версии 2.5 - 500 МБ</p>
                </div>
                <button className="btn-download">Скачать</button>
              </div>
              <div className="file-item">
                <span className="file-icon">🎨</span>
                <div className="file-info">
                  <h4>HD Textures Pack</h4>
                  <p>HD текстуры высокого качества - 2 ГБ</p>
                </div>
                <button className="btn-download">Скачать</button>
              </div>
              <div className="file-item">
                <span className="file-icon">🎵</span>
                <div className="file-info">
                  <h4>Soundtrack OST</h4>
                  <p>Саундтрек игры в высоком качестве</p>
                </div>
                <button className="btn-download">Скачать</button>
              </div>
            </div>
            </div>
          </section>
        )
      case 'community':
        return (
          <section className="page-hero" ref={heroRef}>
            <div className="hero-bg-image" style={getParallaxStyle(8)}></div>
            <div className="hero-overlay"></div>
            <div className="page-content">
              <h2>Сообщество</h2>
              <div className="community-section">
              <div className="community-block">
                <h3>🗣️ Форумы</h3>
                <p>Обсуждения, гайды и помощь новичкам</p>
                <button className="btn-community">Перейти на форум</button>
              </div>
              <div className="community-block">
                <h3>📱 Discord</h3>
                <p>Общение в реальном времени с игроками</p>
                <button className="btn-community">Присоединиться</button>
              </div>
              <div className="community-block">
                <h3>🎮 Кланы</h3>
                <p>Найди свой клан или создай новый</p>
                <button className="btn-community">Смотреть кланы</button>
              </div>
              <div className="community-block">
                <h3>🏆 Турниры</h3>
                <p>Участвуй в соревнованиях и выигрывай призы</p>
                <button className="btn-community">Календарь событий</button>
              </div>
            </div>
            </div>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Главная</button>
          <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>Новости</button>
          <button className={activeTab === 'files' ? 'active' : ''} onClick={() => setActiveTab('files')}>Файлы</button>
          <button className={activeTab === 'community' ? 'active' : ''} onClick={() => setActiveTab('community')}>Сообщество</button>
        </nav>
      </header>
      <main className="main">
        {renderContent()}
      </main>
      <footer className="footer">
        <p>© 2024 L2 Fan Site - Non-commercial fan site</p>
      </footer>
    </div>
  )
}

export default App
