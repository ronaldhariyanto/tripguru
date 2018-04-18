import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'
import '../assets/scss/styles.scss'

const ActivityLink = (props) => (
  <h5>
    <Link as={`/activity/${props.url}`} href={`/activity?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </h5>
)

const ActivityBannerLink = (props) => (
  <Link as={`/activity/${props.url}`} href={`/activity?id=${props.id}`}>
    <a className="tour-item__banner">
      <img src={props.bannerLink + 'h_260,q_90,w_500/' + props.banner + '.jpg'} />
    </a>
  </Link>
)

export default class TourList extends React.Component {
  constructor() {
    super()
    this.state = {
      tours: [],
      banner: 'https://res.cloudinary.com/thetripguru/image/upload/',
    }
  }

  componentDidMount() {
    axios.get(`http://tour.api.thetripguru.com/tours?filter[location.url]=${this.props.url.query.city}&limit=15&offset=1`)
      .then(res => {
        const tours = res.data.data;
        if (typeof tours !== 'undefined') {
          this.setState({ tours });
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <section>
        <Header />
        <div className="text-center">
          <h1 className="headtitle">THINGS TO DO &amp; PLACES TO VISIT IN {(this.props.url.query.city).toUpperCase()}</h1>
        </div>
      
        <div className="grid-container">
          <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
            {this.state.tours.map(tour =>
              <article className="cell tour-item" key={tour.id}>
                <ActivityBannerLink bannerLink={this.state.banner} id={tour.id} url={tour.attributes.url} banner={tour.attributes.media.banners[0].src} />
                <div className="tour-item__title">
                  <ActivityLink id={tour.id} url={tour.attributes.url} title={tour.attributes.title} />
                </div>
              </article>
            )}
          </div>
        </div>
        <Footer />
      </section>
    )
  }
}