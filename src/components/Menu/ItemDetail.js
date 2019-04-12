import React from 'react'
import Header from './Header.js'

class ItemDetail extends React.Component {

  render() {
    const {details} = this.props
    let creditUrl
    if (details['image credit']) {
      creditUrl = 'https://www.instagram.com/' + details['image credit'].substr(1) + '/'
    }

    let backgroundImage
    if (details.Tags !== 'LIST' && !!details.Image) {
      backgroundImage = {
        backgroundImage: 'url(' + details['Image'][0].url + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }



    return (
      <div className='previewModal'>
        <Header showBackArrow />

        <div className="previewItem">

          { !!details.Tags && details.Tags[0] === 'LIST' ? null :
            <div className="previewImage" style={ backgroundImage }></div>
          }

          <div className="previewWrapper">

            <div className="prevDefinition hidden">
              <div className="prevDefinedWord"></div>
              <div className="prevDefinitionText"></div>
            </div>

            {/* No image credit? Don't show this section */}
            { !!details['image credit'] && !!details.Tags && details.Tags[0] !== 'LIST' ?
              <div className="imageCredit">
                <div className="imageCreditLabel">photo by
                  <a className="imageCreditLink" href={creditUrl}>{details['image credit']}</a>
                </div>
              </div>
              : null }

            <div className="previewName">{details['Item Name']}</div>

            <div className="previewDescription">{details['Item Description']}</div>

            <div className="previewDetails">
              <div className="previewPrice">{details['Price']}</div>

              {/* Tags are LIST? Don't show */}
              { !!details.Tags && details.Tags[0] === 'LIST' ? null :
                <div className="previewTags">{ !!details.Tags ? details.Tags.join(', ') : null }</div>
              }
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ItemDetail
