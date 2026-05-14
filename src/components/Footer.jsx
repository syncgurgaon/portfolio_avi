export default function Footer({ content }) {
  const year = new Date().getFullYear()
  const p = content.personal
  return (
    <div id="footer">
      © {year} {p.name} &nbsp;|&nbsp; Bar Council ID: {p.bar_council_id} &nbsp;|&nbsp; All rights reserved
    </div>
  )
}
