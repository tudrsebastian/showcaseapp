/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { Button } from "../Button";
import { Loading } from "../Loading";
import Link from "next/link";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_SERVER;
const projectsURL = process.env.NEXT_PUBLIC_PROJECTS
console.log(projectsURL)
type Project = [
    {
        id: number,
        customerLink: string,
        description: string,
        title: string,
        images: [{
            id: number,
            filename: string,
            mimetype: string,
        }],
    }
]
type Update = {
    title: string,
    customerLink: string,
    description: string,
}

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projects, setProjects] = useState<Project>()
    const [update, setUpdate] = useState<Update>({ title: '', customerLink: '', description: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [updateProjects, setUpdateProjects] = useState(false);
    const [edit, setEdit] = useState(false);
    const images = projects?.map(project => project.images)
    const getProjects = async () => {
        try {
            const res = await axios.get(`${url}${projectsURL}`)
            setProjects(res.data)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProjects();
    }, [updateProjects])
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        if (images !== undefined) {

            const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
        }
    };

    const nextSlide = () => {
        if (images !== undefined) {

            const isLastSlide = currentIndex === images.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    const onClick = async (id: number) => {

        try {
            const res = axios.delete(`${url}${projectsURL}${id}`)

            setUpdateProjects(!updateProjects);
        } catch (error) {
            console.log(error)
        }
    }
    const onEdit = () => {
        setEdit(true);
    }
    const stopEdit = () => {
        setEdit(false);
    }
    const onChangeTitle = (e: { target: { value: string; }; }) => {
        setUpdate({ ...update, title: e.target.value });
    }

    const onChangeLink = (e: { target: { value: string; }; }) => {
        setUpdate({ ...update, customerLink: e.target.value });
    }

    const onChangeDescription = (e: { target: { value: string; }; }) => {
        setUpdate({ ...update, description: e.target.value });
    }
    const onSave = async (id: number) => {
        try {
            const filteredUpdate = Object.fromEntries(
                Object.entries(update).filter(([_, value]) => value !== '')
            );
            const res = await axios.put(`${url}${projectsURL}${id}`, filteredUpdate)
            setUpdateProjects(!updateProjects);

            setEdit(false);
        } catch (erorr) {
            console.log(erorr);
        }
    }
    return (
        <div>
            {projects === null ? <div className="shadow-xl mx-auto min-w-xs my-10 rounded">
                <h2 className="text-center italic font-bold text-2xl">No Projects yet!</h2>
                <p className="text-center text-xl">Add projects to showcase your apps!</p>
            </div> : <div> {isLoading ? <Loading /> : <div>
                {projects?.map(project => {
                    return (

                        <div className="shadow-xl mx-auto min-w-xs my-10 rounded" key={project.id}>
                            <div>
                                {edit ?
                                    <div className="w-48 mx-auto pt-4">

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="title"
                                            type="text"
                                            placeholder="Edit Title" onChange={onChangeTitle} />
                                    </div> :
                                    <h3 className="text-center italic font-bold text-2xl">{project.title}</h3>}

                            </div>
                            {isLoading && project.images === undefined ? <Loading /> : <div className='w-full sm:h-full md:h-full lg:h-screen  mx-auto py-16 px-4 relative group'>
                                <div
                                    style={{
                                        backgroundImage: `url(http://localhost:3001/images/${project.images[currentIndex].filename})`,
                                    }}
                                    className='lg:w-full lg:h-full sm:w-full sm:h-96 rounded-2xl bg-center bg-cover duration-500 object-cover'
                                ></div>
                                <div className='hidden group-hover:block absolute sm:top-[25%] -translate-x-0 translate-y-[-20%] lg:top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                                </div>
                                <div className='hidden group-hover:block absolute sm:top-[25%] -translate-x-0 translate-y-[-20%] lg:top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                                </div>
                                <div className='flex top-4 justify-center py-2'>
                                    {project.images.map((slide, slideIndex) => (
                                        <div
                                            key={slideIndex}
                                            onClick={() => goToSlide(slideIndex)}
                                            className='text-2xl cursor-pointer'
                                        >
                                            <RxDotFilled />
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            <div>
                                {edit ?
                                    <div className="flex w-60 mx-auto ">

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="customerLink"
                                            type="text"
                                            placeholder="Edit Link" onChange={onChangeLink} />
                                    </div> :
                                    <div className="text-center">
                                        <Link href={project.customerLink} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >Live App</Link>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-start">
                                <h4 className="ml-12">Description: </h4>
                                {edit ?
                                    <div className="flex w-1/2 mx-auto  pt-4">

                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="description"
                                            type="text"
                                            placeholder="Edit Description" onChange={onChangeDescription} />

                                    </div> :
                                    <p className="text-center px-4 sm:py-2 lg:py-10">{project.description}</p>
                                }
                            </div>

                            {edit ? <div className="flex gap-2 ml-24 pb-4 pt-4">
                                <Button name="Cancel" onClick={stopEdit} />
                                <Button name="Save" onClick={() => onSave(project.id)} />
                            </div> : <div className="flex gap-4 ml-24 pb-4">
                                <Button name="Delete" onClick={() => onClick(project.id)} />
                                <Button name="Edit" onClick={onEdit} />
                            </div>}

                        </div>
                    )
                })
                }</div>}</div>}





        </div>
    );
}

export default Projects;