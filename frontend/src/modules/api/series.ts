import axiosRequest, {
    ResponseData,
    serializeObject,
} from './index';

export async function getUserSeries(author: string, page: number) {
    return await axiosRequest<ResponseData<GetUserSeriesData>>({
        url: `/v1/users/${encodeURIComponent(author)}/series?page=${page}`,
        method: 'GET'
    });
}

export interface GetUserSeriesData {
    series: {
        url: string;
        name: string;
        image: string;
        createdDate: string;
        owner: string;
    }[];
    lastPage: number;
}

export async function postUserSeries(author: string, title: string) {
    return await axiosRequest<ResponseData<PostUserSeriesData>>({
        url: `/v1/users/${encodeURIComponent(author)}/series`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: serializeObject({
            title
        }),
    });
}

export interface PostUserSeriesData {
    url: string;
}

export async function getAnUserSeries(author: string, url: string) {
    return await axiosRequest<ResponseData<GetAnUserSeriesData>>({
        url: `/v1/users/${encodeURIComponent(author)}/series/${encodeURIComponent(url)}`,
        method: 'GET'
    });
}

export interface GetAnUserSeriesData {
    name: string;
    url: string;
    image: string;
    owner: string;
    ownerImage: string;
    description: string;
    posts: GetAnUserSeriesDataPosts[];
}

export interface GetAnUserSeriesDataPosts {
    url: string;
    title: string;
    readTime: number;
    description: string;
    createdDate: string;
}

export async function putUserSeries(author: string, url: string, data: object) {
    return await axiosRequest<ResponseData<putUserSeriesData>>({
        url: `/v1/users/${encodeURIComponent(author)}/series/${encodeURIComponent(url)}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: serializeObject(data),
    });
}

export interface putUserSeriesData {
    url: string;
}

export async function deleteUserSeries(author: string, url: string) {
    return await axiosRequest<ResponseData<any>>({
        url: `/v1/users/${encodeURIComponent(author)}/series/${encodeURIComponent(url)}`,
        method: 'DELETE',
    });
}