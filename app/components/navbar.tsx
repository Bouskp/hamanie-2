interface Props {
  params: Promise<{
    links: Link[]
    buttons: Button[]
  }>
}

interface Button {
  label: string
  url: string
  primary: boolean
}

interface Link {
  label: string
  url: string
}

export default async function Navbar({ params }: Props) {
  const { links, buttons } = await params

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <a href='/'>Hamaniè-site d'infos</a>
        </div>
        <ul className='nav-links'>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className='button-group'>
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              className={
                button.primary ? 'btn btn-primary' : 'btn btn-secondary'
              }
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
