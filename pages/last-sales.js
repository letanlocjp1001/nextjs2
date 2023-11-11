import { useEffect, useState } from 'react'
import useSWR from 'swr'

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales)
  // const [isLoading, setIsLoading] = useState(false)

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-4a639-default-rtdb.firebaseio.com/sales.json',
    fetcher
  )

  useEffect(() => {
    if (data) {
      const transformedSales = []
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(transformedSales)
    }
  }, [data])
  // useEffect(() => {
  //   setIsLoading(true)

  //   fetch('https://nextjs-course-4a639-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = []

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         })
  //       }

  //       setSales(transformedSales)
  //       setIsLoading(false)
  //     })
  // }, [])

  if (error) {
    return <p>no data</p>
  }
  if (isLoading && !sales) {
    return <p>Loading....</p>
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-4a639-default-rtdb.firebaseio.com/sales.json'
  )
  const data = await response.json()
  // .then((response) => response.json())
  // .then((data) => {
  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    })
  }
  return { props: { sales: transformedSales } }
  // })
}
