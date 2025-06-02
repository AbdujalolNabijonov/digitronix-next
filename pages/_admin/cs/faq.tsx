import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { MembersInquiry } from "@/libs/types/member/member.input"
import { Box, Button, MenuItem, Modal, OutlinedInput, Select, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { FaqList } from "@/libs/components/admin/cs/faqList"
import { Add, CancelRounded, ErrorOutline } from "@mui/icons-material"
import { FaqInquiry } from "@/libs/types/faq/faq.input"
import { FaqCategory, FaqStatus } from "@/libs/enum/faq.enum"
import { CssVarsProvider, FormLabel, Input, FormControl as JoyForm } from "@mui/joy"
import { FilePlus, X } from "phosphor-react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_TARGET_FAQS } from "@/apollo/user/query"
import { FaqObj } from "@/libs/types/faq/faq"
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { CREATE_FAQ, DELETE_TARGET_FAQ } from "@/apollo/user/mutation"
import { Messages } from "@/libs/config"

const Faq: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [faqInquiry, setFaqInquiry] = useState<FaqInquiry>(initialProps)
    const [value, setValue] = useState<string>("ALL")
    const [toggleModal, setToggleModal] = useState(false)
    const [faqList, setFaqList] = useState<FaqObj[]>([])
    const [total, setTotal] = useState<number>(0)
    const [faqcreateObj, setFaqcreateObj] = useState({
        faqQuestion: "",
        faqAnswer: "",
        faqCategory: FaqCategory.GENERAL
    })

    const {
        refetch: getTargetFaqsRefetch
    } = useQuery(GET_TARGET_FAQS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: faqInquiry },
        onCompleted: ({ getTargetFaqs }) => {
            setFaqList(getTargetFaqs.list)
            setTotal(getTargetFaqs.metaCounter[0].total ?? 0)
        }
    })
    const [createFaq] = useMutation(CREATE_FAQ)
    const [deleteTargetFaq] = useMutation(DELETE_TARGET_FAQ)

    useEffect(() => {
        getTargetFaqsRefetch({ input: faqInquiry }).then()
    }, [faqInquiry])
    //Handlers
    const submitDataHandler = async () => {
        try {
            if (!faqcreateObj.faqAnswer || !faqcreateObj.faqCategory || !faqcreateObj.faqQuestion) {
                setToggleModal(false)
                throw new Error(Messages.error3)
            }
            await createFaq({ variables: { input: faqcreateObj } });
            await sweetTopSmallSuccessAlert("Successfully faq created!")
            setToggleModal(false);
            await getTargetFaqsRefetch({ input: faqInquiry })
        } catch (err: any) {
            console.log(`ERROR: submitDataHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }

    const deleteTargetFaqHandler = async (e: any, targetId: string) => {
        try {
            if (!targetId) throw new Error(Messages.error1);
            const confirm = await sweetConfirmAlert("Do you want to delete?")
            if (confirm) {
                await deleteTargetFaq({ variables: { input: targetId } });
                await sweetTopSmallSuccessAlert("Successfully deleted!")
                await getTargetFaqsRefetch({ input: faqInquiry })
            }
        } catch (err: any) {
            console.log(`ERROR: deleteTargetFaq, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }

    const changePageHandler = async (event: unknown, newPage: number) => {
        faqInquiry.page = newPage + 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setFaqInquiry({ ...faqInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        faqInquiry.limit = parseInt(event.target.value, 10);
        faqInquiry.page = 1;
        // await getAllMembersReftch({ input: membersInquiry })
        setFaqInquiry({ ...faqInquiry });
    };


    const textHandler = (text: string) => {
        faqInquiry.search.text = text
        setFaqInquiry({...faqInquiry})
    }


    const handleSearchCategory = (category: string) => {
        if (category !== "ALL") {
            setFaqInquiry({ ...faqInquiry, search: { ...faqInquiry.search, faqCategory: category } })
        } else {
            delete faqInquiry.search.faqCategory;
            setFaqInquiry({...faqInquiry})
        }
        setValue(category)
    }

    const toggleModalHandler = () => {
        if (!toggleModal) {
            setToggleModal(true)
        } else {
            setToggleModal(false)
        }
    }
    const changeCategoryHandler = (e: any) => {
        faqcreateObj.faqCategory = e.target.value
        setFaqcreateObj({ ...faqcreateObj })
    }
    const setQuestionHandler = (e: any) => {
        faqcreateObj.faqQuestion = e.target.value;
        setFaqcreateObj({ ...faqcreateObj })
    }
    const setAnswerHandler = (e: any) => {
        faqcreateObj.faqAnswer = e.target.value
        setFaqcreateObj({ ...faqcreateObj })
    }
    return (
        <>
            <Stack className="admin-user" >
                <Box className="title">
                    FAQ Management
                </Box>
                <>
                    <Button
                        sx={{ backgroundColor: "gray", width: "150px", marginTop: "30px", fontWeight: "bold", color: "white" }}
                        onClick={toggleModalHandler}
                    >
                        <div>ADD</div>
                        <Add />
                    </Button>
                    <Modal
                        open={toggleModal}
                        onClose={toggleModalHandler}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Stack className="faq-modal">
                            <Stack className="faq-main">
                                <Box className="title">ADD FAQ</Box>
                                <CssVarsProvider>
                                    <Stack>
                                        <label htmlFor="selectCategory" className="add-label">Category</label>
                                        <select
                                            id="selectCategory"
                                            onChange={changeCategoryHandler}
                                            value={faqcreateObj.faqCategory}
                                        >
                                            {
                                                Object.values(FaqCategory).map((category: string, index: number) => (
                                                    (<option value={category} key={index}>{category}</option>)
                                                ))
                                            }
                                        </select>
                                    </Stack>
                                    <Stack>
                                        <JoyForm>
                                            <FormLabel className="add-label">Question</FormLabel>
                                            <Input placeholder="Type in here…" variant="outlined" onChange={setQuestionHandler} />
                                        </JoyForm>
                                    </Stack>
                                    <Stack>
                                        <JoyForm>
                                            <FormLabel className="add-label">Answer</FormLabel>
                                            <textarea rows={10} onChange={setAnswerHandler}></textarea>
                                        </JoyForm>
                                    </Stack>
                                </CssVarsProvider>
                                <Stack flexDirection={"row"} gap={"30px"}>
                                    <Button endIcon={< X />} variant="contained" color="info" onClick={toggleModalHandler}>Exit</Button>
                                    <Button endIcon={<FilePlus />} variant="contained" color="warning" onClick={submitDataHandler}>Add</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Modal>
                </>
                <Stack>
                    <Stack className="search-panel">
                        <Stack className="search-area" direction={"row"} alignItems={"center"} justifyContent={"end"}>
                            <OutlinedInput
                                value={faqInquiry.search.text}
                                onChange={(e: any) => textHandler(e.target.value)}
                                sx={{ width: '100%' }}
                                className={'search'}
                                placeholder="Search user name"
                                endAdornment={
                                    <>
                                        {faqInquiry.search.text && (
                                            <CancelRounded
                                                style={{ cursor: 'pointer' }}
                                                onClick={async () => {
                                                    setFaqInquiry({
                                                        ...faqInquiry,
                                                        search: {
                                                            ...faqInquiry?.search,
                                                            text: '',
                                                        },
                                                    });
                                                    // await getAllProductsRefetch({ input: productsInquiry })
                                                }}
                                            />
                                        )}
                                    </>
                                }
                            />
                            <Select sx={{ width: '160px', ml: '20px' }} value={value}>
                                <MenuItem value={"ALL"} onClick={() => handleSearchCategory('ALL')}>
                                    All
                                </MenuItem>
                                {
                                    Object.values(FaqCategory).map((category: string) => (
                                        <MenuItem value={category} onClick={() => handleSearchCategory(category)}>
                                            {category}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <Box className="table-list">
                        {
                            faqList && faqList.length > 0 ? (
                                <>
                                    <FaqList faqList={faqList} deleteTargetFaqHandler={deleteTargetFaqHandler} />
                                    <TablePagination
                                        style={{ color: "white" }}
                                        rowsPerPageOptions={[10, 20, 40, 60]}
                                        component="div"
                                        count={total}
                                        rowsPerPage={faqInquiry?.limit}
                                        page={faqInquiry?.page - 1}
                                        onPageChange={changePageHandler}
                                        onRowsPerPageChange={changeRowsPerPageHandler}
                                    />
                                </>
                            ) : (
                                <Stack
                                    alignItems={"center"}
                                    style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                    gap={"10px"}
                                >
                                    <ErrorOutline fontSize="large" />
                                    <div>No products found!</div>
                                </Stack>
                            )
                        }
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

Faq.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(Faq)