import React, { useRef, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { Messages, REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { ArticleCategory } from '@/libs/enum/article.enum';
import { CREATE_ARTICLE } from '@/apollo/user/mutation';
import { CssVarsProvider, Input, Option, Select, selectClasses } from '@mui/joy';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { KeyboardArrowDown } from '@mui/icons-material';

const TuiEditor = () => {
    const editorRef = useRef<Editor>(null),
        token = getJwtToken(),
        router = useRouter();
    const [articleObj, setArticleObj] = useState({
        articleTitle: "",
        articleContext: "",
        articleImage: "",
        articleCategory: ""
    })
    /** APOLLO REQUESTS **/
    const [createBoardArticle] = useMutation(CREATE_ARTICLE)

    /** HANDLERS **/
    const uploadImage = async (image: any) => {
        try {
            const formData = new FormData();
            formData.append(
                'operations',
                JSON.stringify({
                    query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target) 
				  }`,
                    variables: {
                        file: null,
                        target: 'article',
                    },
                }),
            );
            formData.append(
                'map',
                JSON.stringify({
                    '0': ['variables.file'],
                }),
            );
            formData.append('0', image);

            const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apollo-require-preflight': true,
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseImage = response.data.data.imageUploader;
            console.log('=responseImage: ', responseImage);
            articleObj.articleImage = responseImage;
            setArticleObj({ ...articleObj })
            return `${REACT_APP_API_URL}/${responseImage}`;
        } catch (err) {
            console.log('Error, uploadImage:', err);
        }
    };

    const changeCategoryHandler = (e: any, value: any) => {
        articleObj.articleCategory = value;
        setArticleObj({ ...articleObj })
    };

    const articleTitleHandler = (e: any) => {
        articleObj.articleTitle = e.target.value;
        setArticleObj({ ...articleObj })
    };

    const handleRegisterButton = async () => {
        try {
            const editor = editorRef.current;
            articleObj.articleContext = editor?.getInstance().getHTML() as string;
            setArticleObj(articleObj)
            console.log(articleObj)
            if (!articleObj.articleContext && !articleObj.articleTitle) {
                throw new Error(Messages.error3)
            }
            await createBoardArticle({
                variables: {
                    input: articleObj
                }
            })
            await sweetTopSmallSuccessAlert("Article is created successfully", 700);
            await router.push({
                pathname: "/member",
                query: { stage: '5' }
            })

        } catch (err: any) {
            console.log("Error, handleRegisterButton:", err.message);
            await sweetErrorHandling(err)
        }
    };
    return (
        <Stack>
            <Stack className="select-inputs" direction="row" style={{ margin: '40px' }} justifyContent="space-between">
                <CssVarsProvider>
                    <Select
                        color="neutral"
                        className="select-category"
                        placeholder="Choose one…"
                        size="md"
                        variant="solid"
                        onChange={changeCategoryHandler}
                        indicator={<KeyboardArrowDown />}
                        sx={{
                            width: 240,
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                            },
                        }}
                    >
                        {
                            Object.values(ArticleCategory).map((category: string, index: number) => (
                                <Option value={category} key={index}>{category}</Option>
                            ))
                        }
                    </Select>
                    <Input className="select-category" onChange={articleTitleHandler} placeholder="Title" variant="solid" />
                </CssVarsProvider>
            </Stack>
            <Editor
                initialValue={'Type here'}
                placeholder={'Type here'}
                previewStyle={'vertical'}
                height={'640px'}
                // @ts-ignore
                initialEditType={'WYSIWYG'}
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['image', 'table', 'link'],
                    ['ul', 'ol', 'task'],
                ]}
                ref={editorRef}
                hooks={{
                    addImageBlobHook: async (image: any, callback: any) => {
                        const uploadedImageURL = await uploadImage(image);
                        callback(uploadedImageURL);
                        return false;
                    },
                }}
                events={{
                    load: function (param: any) { },
                }}
            />
            <Stack className='article-submit' direction="row" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegisterButton}
                >
                    Register
                </Button>
            </Stack>
        </Stack>
    );
};

export default TuiEditor;
