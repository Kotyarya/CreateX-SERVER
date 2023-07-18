const {Blog, ArticleElement, VideoElement, PodcastElement} = require("../models/models");
const ApiError = require("../Error/ApiError");
const uuid = require("uuid");
const path = require("path");
const {Sequelize} = require("sequelize");

class BlogController {

    async create(req, res, next) {
        try {

            const {title, branchId, month, day, mainText, firstText, secondText, summary} = req.body

            const blog = await Blog.create({
                title, branchId, month, day, mainText, firstText, secondText, summary
            })
            return res.status(200).json(blog)

        } catch (e) {

        }

    }

    async getAll(req, res, next) {
        const {branchId, blogTypeId} = req.query

        if (!branchId && !blogTypeId || branchId === "0" && blogTypeId === "0") {
            const blogsArticle = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 1
                    },
                    include: {
                        model: ArticleElement,
                        as: "articleElement",
                        attributes: ["article", "text"]
                    }
                }
            )
            const blogsVideo = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 2
                    },
                    include: {
                        model: VideoElement,
                        as: "videoElement",
                        attributes: ["url"]
                    }
                }
            )
            const blogsPodcast = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 3
                    },
                    include: {
                        model: PodcastElement,
                        as: "podcastElement",
                        attributes: ["audio"]
                    }
                }
            )
            return res.status(200).json({
                "count": [...blogsArticle, ...blogsPodcast, ...blogsVideo].length,
                "rows": [...blogsArticle, ...blogsPodcast, ...blogsVideo]
            })
        }

        if (!branchId || branchId === "0") {
            switch (blogTypeId) {
                case "1":
                    const blogsArticle = await Blog.findAll(
                        {
                            where: {
                                blogTypeId: 1
                            },
                            include: {
                                model: ArticleElement,
                                as: "articleElement",
                                attributes: ["article", "text"]
                            }
                        }
                    )
                    return res.status(200).json(blogsArticle)
                case "2":
                    const blogsVideo = await Blog.findAll(
                        {
                            where: {
                                blogTypeId: 2
                            },
                            include: {
                                model: VideoElement,
                                as: "videoElement",
                                attributes: ["url"]
                            }
                        }
                    )
                    return res.status(200).json(blogsVideo)
                case "3":
                    const blogsPodcast = await Blog.findAll(
                        {
                            where: {
                                blogTypeId: 3
                            },
                            include: {
                                model: PodcastElement,
                                as: "podcastElement",
                                attributes: ["audio"]
                            }
                        }
                    )
                    return res.status(200).json(blogsPodcast)
            }
        }

        if (!blogTypeId || blogTypeId === "0") {
            const blogsArticle = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 1,
                        branchId: branchId
                    },
                    include: {
                        model: ArticleElement,
                        as: "element",
                        attributes: ["article", "text"]
                    }
                }
            )
            const blogsVideo = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 2,
                        branchId: branchId
                    }
                }
            )
            const blogsPodcast = await Blog.findAll(
                {
                    where: {
                        blogTypeId: 3,
                        branchId: branchId
                    }
                }
            )
            return res.status(200).json({
                "count": [...blogsArticle, ...blogsPodcast, ...blogsVideo].length,
                "rows": [...blogsArticle, ...blogsPodcast, ...blogsVideo]
            })
        }

        switch (blogTypeId) {
            case "1":
                const blogsArticle = await Blog.findAll(
                    {
                        where: {
                            blogTypeId: 1,
                            branchId: branchId
                        },
                        include: {
                            model: ArticleElement,
                            as: "articleElement",
                            attributes: ["article", "text"]
                        }
                    }
                )
                return res.status(200).json(blogsArticle)
            case "2":
                const blogsVideo = await Blog.findAll(
                    {
                        where: {
                            blogTypeId: 2,
                            branchId: branchId
                        },
                        include: {
                            model: VideoElement,
                            as: "videoElement",
                            attributes: ["url"]
                        }
                    }
                )
                return res.status(200).json(blogsVideo)
            case "3":
                const blogsPodcast = await Blog.findAll(
                    {
                        where: {
                            blogTypeId: 3,
                            branchId: branchId
                        },
                        include: {
                            model: PodcastElement,
                            as: "podcastElement",
                            attributes: ["audio"]
                        }
                    }
                )
                return res.status(200).json(blogsPodcast)
        }
    }


    async getOne(req, res, next) {

        const {id} = req.params

        const blogs = await Blog.findOne({
            where: {id}
        })

        return res.status(200).json(blogs)

    }

    async delete(req, res) {
        const {id} = req.params

        const blog = await Blog.destroy({where: {id}})


        return res.status(200).json(blog)
    }


    async update(req, res) {
        const {id} = req.params
        const {blogTypeId} = req.body

        const blog = await Blog.upsert(
            {
                id: id,
                blogTypeId: blogTypeId
            }
        )
        return res.status(200).json(blog)

    }
}


module.exports = new BlogController()