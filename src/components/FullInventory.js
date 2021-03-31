import { useEffect, useState } from 'react';
import db from '../util/firebase';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const FullInventory = () => {

    const [partsData, setPartsData] = useState([]);


    useEffect(() => {
        db.
            collection('partsData')
            .orderBy('referenceNumber', 'asc')
            .onSnapshot((snapshot) =>
                setPartsData(snapshot.docs.map((doc) => doc.data()))
            )
    }, [])


    return (
        <TableContainer component={Paper} style={{ width: '50%' }}>
            <Table aria-label="parts data table">
                <TableHead style={{ backgroundColor: 'black' }}>
                    <TableRow>
                        <TableCell className="text-white" >Ref #</TableCell>
                        <TableCell className="text-white" align="left">Part Number</TableCell>
                        <TableCell className="text-white" align="left">Description</TableCell>
                        <TableCell className="text-white" align="left">Pcs Per Box</TableCell>
                        <TableCell className="text-white" align="left">Inventory</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {partsData.map((part) => (
                        <TableRow key={part.referenceNumber}>
                            <TableCell component="th" scope="row">
                                {part.referenceNumber}
                            </TableCell>
                            <TableCell align="left">{part.partNumber}</TableCell>
                            <TableCell align="left">{part.description}</TableCell>
                            <TableCell align="left">{part.pcsPerBox}</TableCell>
                            <TableCell align="left">{part.qtyOnHand}</TableCell>
                            <br />
                            <br />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >

    )
}

export default FullInventory
