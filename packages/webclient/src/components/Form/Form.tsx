import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import validationSchema from './validationSchema'
const MAX_COUNT = 5
const url = process.env.NEXT_PUBLIC_SERVER;
const projectsurl = process.env.NEXT_PUBLIC_PROJECTS;
const imagesurl = process.env.NEXT_PUBLIC_IMAGES;
interface Props {
  onClick: () => void;
  isOpen: boolean;
  handleSubmit: () => void;
}
const Form: React.FC<Props> = ({ onClick, isOpen, handleSubmit }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [fileLimit, setFileLimit] = useState<boolean>(false)
  useEffect(() => {
    setUploadedFiles([])
  }, [isOpen])
  const handleUploadFiles = (files: FileList) => {
    const uploaded = [...uploadedFiles]
    let limitExceeded = false
    Array.from(files).some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) setUploadedFiles(uploaded);
  }
  const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = e.target.files;
    if (chosenFiles) handleUploadFiles(chosenFiles);
  }
  const formData = new FormData()
  uploadedFiles.forEach((file) => {
    formData.append('images[]', file)
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      customerLink: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.all([
          await axios.post(`${url}${projectsurl}`, values),
          axios.post(`${url}${imagesurl}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        ])
        handleSubmit()
      } catch (errors) {
        console.log(errors)
      }
    },
  })

  return (
    <div className="w-full min-w-xs mx-auto py-10 px-2 md:px-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Project Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Description"
          >
            Project Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="customerLink"
          >
            Project Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customerLink"
            type="text"
            placeholder="customerLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customerLink}
          />
          {formik.touched.customerLink && formik.errors.customerLink ? (
            <div>{formik.errors.customerLink}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="multiple_files"
          >
            Upload images
          </label>
          <input
            onChange={handleFileEvent}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="multiple_files"
            type="file"
            multiple
            disabled={fileLimit}
          />
          {uploadedFiles.map((file, i) => (
            <div key={i}>{file.name}</div>
          ))}
        </div>
        <div className="flex items-center justify-start gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Project
          </button>
          <Button name="Cancel" onClick={onClick} />
        </div>
      </form>
    </div>
  )
}

export default Form
