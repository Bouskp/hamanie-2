export default async function TagsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className='container'>
      <h1>Page du tag : {slug}</h1>
    </div>
  )
}
