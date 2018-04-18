import axios from 'axios'
import '../assets/scss/styles.scss'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'

const Activity = (props) => (
  <section>
    <Header />
    <div className="callout large">
      <div className="text-center">
        <h1>{props.tour.attributes.title}</h1>
      </div>
    </div>
    <div className="grid-container">
      <div className="grid-x align-center">
        <div className="cell medium-8">
          <div className="tour-detail">
            <img className="thumbnail" src={'https://res.cloudinary.com/thetripguru/image/upload/w_1280,h_500,c_fill,g_center/' + props.tour.attributes.media.banners[0].src + '.jpg'} />
            <div dangerouslySetInnerHTML={{ __html: props.tour.attributes.description }} />
            <Link href={`/city/${props.tour.attributes.location.url}`}>
              <a>Back to Tour List in {props.tour.attributes.location.city}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </section>
)

Activity.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await axios.get(`http://tour.api.thetripguru.com/tours/${id}`)
  const tour = await res.data.data
  return { tour }
}

export default Activity