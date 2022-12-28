import React from "react";
import {Button} from "react-bootstrap";
import {StyledContainer, EmptyState, Pagination} from "../components";
import {useHistory} from "react-router-dom";

export default (ListComponent, opts) => {
    return (props) => {
        const history = useHistory();
        const { label, navAdd } = opts;
        const { listData } = props;
        const [currentPage, setCurrentPage] = React.useState(1);
        const [recordsPerPage] = React.useState(3);

        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = listData?.slice(indexOfFirstRecord, indexOfLastRecord);
        const totalPage = Math.ceil(listData?.length / recordsPerPage);

        return (
            <>
                <StyledContainer>
                    <Button variant="success" onClick={() => history.push(navAdd)}>Add {label}</Button>
                    {currentRecords?.length > 0 ? (
                        <ListComponent data={currentRecords} {...props} />
                    ): <EmptyState text={`Data ${label} Kosong...`} />}
                </StyledContainer>
                <Pagination
                    totalPage={totalPage}
                    onChangeCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </>
        )
    }
}
