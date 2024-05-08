import { getCollection } from 'astro:content';

export const useTurnstile = !!import.meta.env.CF_TURNSTILE_SITE_KEY && !!import.meta.env.CF_TURNSTILE_SITE_KEY;

export const getTagMap = async () => {
    let blogEntries = await getCollection('blog');

    let allTags = [];
    blogEntries.forEach((post) => {
        if (post.data.tags) {
            const tags = post.data.tags.split(",");
            allTags = allTags.concat(tags);
        }
    });

    const uniqueTags = [...new Set(allTags)];

    const tagMap = new Map();
    uniqueTags.forEach((tag) => {
        const lowercaseTagId = tag.toLowerCase().replace(/ /g, "_");
        const tagWithSpaces = tag.replace(/_/g, " ");
        tagMap.set(lowercaseTagId, tagWithSpaces);
    });

    return tagMap;
};
