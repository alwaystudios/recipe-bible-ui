import styled from '@emotion/styled'
import React from 'react'
import { Advert } from './Advert'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  margin: 2rem 0;
`

// todo: use db, add unit tests
const ads = [
  {
    src: 'https://ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=recipebible-21&marketplace=amazon&region=GB&placement=B01B4NJIKY&asins=B01B4NJIKY&linkId=310e10f5cd5b033260d35e6e7201e3a9&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff',
    href: 'https://www.amazon.co.uk/dp/B01B4NJIKY/ref=as_sl_pc_tf_til?tag=recipebible-21&linkCode=w00&linkId=310e10f5cd5b033260d35e6e7201e3a9&creativeASIN=B01B4NJIKY',
  },
  {
    src: 'https://ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=recipebible-21&marketplace=amazon&region=GB&placement=B07PQF4Z5W&asins=B07PQF4Z5W&linkId=d1ce387ac1d158ce68cff8ef224351e8&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff',
    href: 'https://www.amazon.co.uk/dp/B07PQF4Z5W/ref=as_sl_pc_tf_til?tag=recipebible-21&linkCode=w00&linkId=d1ce387ac1d158ce68cff8ef224351e8&creativeASIN=B07PQF4Z5W',
  },
  {
    src: 'https://ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=recipebible-21&marketplace=amazon&region=GB&placement=B001DXVL6K&asins=B001DXVL6K&linkId=9054d5cd050c313cb99aa24417cc6bbd&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff',
    href: 'https://www.amazon.co.uk/dp/B001DXVL6K/ref=as_sl_pc_tf_til?tag=recipebible-21&linkCode=w00&linkId=9054d5cd050c313cb99aa24417cc6bbd&creativeASIN=B001DXVL6K',
  },
]

export const Adverts: React.FC = () => (
  <Container>
    {ads.map(({ src, href }, index) => (
      <Advert key={index} src={src} href={href} />
    ))}
  </Container>
)
