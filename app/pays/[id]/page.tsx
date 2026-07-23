export default async function PaysPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className='container'>
      <h1>Page du pays : {id}</h1>
    </div>
  )
}
