import axios from 'axios'
import Form from 'react-bootstrap/Form'


const ImageUpload = ({ formData, setFormData }) => {
  const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  const handleImageUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    console.log(e.target.files)

    try {
      const res = await axios.post(uploadURL, data)
      setFormData({ ...formData, profile_image: res.data.url })
      console.log('data', res.data)
    } catch (error) {
      console.log(error.response)
    }
    
  }

  return (
    <>
      <Form.Group>
        <div className='upload'>
          <label htmlFor="imageTrans" className="label">Profile Image Upload</label>
          <input
            name="profile_image"
            className="input"
            type="file"
            onChange={handleImageUpload}
          />
        </div>
      </Form.Group>
    </>
  )
}

export default ImageUpload