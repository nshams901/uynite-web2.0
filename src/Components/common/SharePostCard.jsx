import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import user from "../../Assets/Images/user.png";
import { useNavigate } from "react-router-dom";
import { responsive } from "../Home/SliderSection/MainCarousel";
import Carousel from "react-multi-carousel";
//   import { StarIcon } from "@heroicons/react/24/solid";

export default function SharePostCard({ data, profileData , handleModal}) {
  const navigate = useNavigate();
  const { text, image } = data;
  const { pimage, fname, lname, job, id } = profileData;
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        onClick={() => navigate(`/profile/${id}`)}
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pb-3 mt-3 cursor-pointer"
      >
        <Avatar
          size="md"
          variant="circular"
          className="rounded-full min-w-[48px]"
          src={pimage || user}
          alt="User"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" className=" text-base" color="blue-gray">
              {fname || ""} {lname || ""}
            </Typography>
          </div>
          <Typography variant="p" className="text-xs" color="blue-gray">
            {job ? `@${job}` : ""}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <Typography> {text} </Typography>
        {
            data.viptype === 5 ? (
              <>
                <div
                  className="m-3 mb-0 w-[200px] h-[200px] rounded-full"
                  // onClick={() => handleModal(item)}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full rounded-full object-cover border border-gray-500"
                  />
                </div>
              </>
            ) : 
            image ?
             image?.split("@").length > 1 ? (
              <Carousel
                infinite
                arrows
                responsive={responsive}
                showDots={true}
                className="w-full"
              >
                {image?.split("@").map((item) => {
                  return (
                    <div className="flex justify-center ">
                      <div className="w-full h-[260px] border border-gray-400">
                        {
                          item.includes('mp4') ?
                            <video src={item} > </video>
                            :
                            <img
                              src={item}
                              alt="image"
                              className="mb-3 opacity-40 w-full h-full object-cover"
                            />
                        }
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            ) :
              <>
                <div
                  className="m-3 mb-0  sm:w-full max-w-[500px] h-[260px] rounded-full"
                  onClick={() => handleModal(data)}
                >
                  {
                    image.includes('mp4')
                      ? <video src={image}
                        className="w-full h-full object-cover border border-gray-500"
                        controls></video>
                      :
                      <img
                        src={image}
                        alt=""
                        className="w-full opacity-40 h-full object-cover border border-gray-500"
                      />
                  }
                </div>
              </>
            : ""
        }
      </CardBody>
    </Card>
  );
}
