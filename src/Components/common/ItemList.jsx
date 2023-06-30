import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import userIcon from "../../Assets/Images/user.png";
import { Link } from "react-router-dom";

export default function ItemList({ item, user, handleListItem, name, value }) {
  const { id, pimage, fname, lname } = item || {};

  return (
    <>
      {user ? (
        <Card className="border-none rounded-none px-3 py-2 cursor-pointer" onClick={handleListItem}>
          <div>
            <div
              className="flex items-center gap-2 flex-1"
            // onClick={() }
            >
              <img
                src={pimage || userIcon}
                alt=""
                className="w-[45px] h-[45px] rounded-full"
              />
              <span className="font-semibold text-[14px]">
                {`${fname} ${lname}`}
              </span>
            </div>
          </div>
        </Card>
      ) :
        <Card className="border-1 border rounded-none px-3 py-2 h-full cursor-pointer">
          <Link to={'/reals/state'} className="flex justify-between">
            <Typography>{name}</Typography>
            <Typography>{value}</Typography>
          </Link>
        </Card>
      }

    </>
  );
}
