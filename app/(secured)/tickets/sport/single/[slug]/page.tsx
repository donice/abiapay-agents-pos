import LoadingOffLoadingPageComponent from '@/src/components/modules/tickets/transport/loading_offloading'
import React from 'react'

const LoadingOffLoadingPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug
  
  console.log(slug)
  return (
    <div><LoadingOffLoadingPageComponent /></div>
  )
}

export default LoadingOffLoadingPage