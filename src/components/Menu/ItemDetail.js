import React from 'react'

class ItemDetail extends React.Component {

  render() {
    const {details} = this.props
    const creditUrl = 'https://www.instagram.com/' + details['image credit'].substr(1) + '/'
    const backgroundImage = {
      backgroundImage: 'url(' + details['Image'][0].url + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div className='previewModal'>

        <div className="previewItem">

          <div className="previewImage" style={ backgroundImage }></div>

          <div className="previewWrapper">

            <div className="prevDefinition hidden">
              <div className="prevDefinedWord"></div>
              <div className="prevDefinitionText"></div>
            </div>

            {/* No image credit? Don't show this section */}
            { !!details['image credit'] ?
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

              <div className="previewTags">{details['Tags'].join(', ')}</div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default ItemDetail
