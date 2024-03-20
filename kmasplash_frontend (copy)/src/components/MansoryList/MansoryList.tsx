import { Col, Image, Row } from "antd";
import images from "assets/images/images";
import CommonButton from "components/Button/CommonButton";
import { Post } from "models/post.interrface";
import React, { memo, useMemo } from "react";

const divideArray = (array: Post[], length: number) => {
  if (!Array.isArray(array)) {
    return [];
  }
  const newArray = [...array];
  const divideRes = Math.floor(newArray.length / length);
  let results = [];

  for (let i = 0; i < length; i++) {
    results.push(newArray.splice(0, divideRes));
  }

  for (let i = 0; i < newArray.length; i++) {
    results[i].push(newArray[i]);
  }

  results = results.filter((itm) => itm.length);
  return results;
};

const Masonry: React.FunctionComponent<{
  dataArray: Post[];
  columnCount: number;
  ChildsElement: any;
}> = ({ dataArray, columnCount, ChildsElement }) => {
  return useMemo(() => {
    const arr = divideArray(dataArray, columnCount);
    return arr.length != 0 ? (
      <Row justify="center">
        {arr?.map((itm, i) => (
          <Col
            xs={24 / columnCount}
            lg={24 / columnCount}
            md={24 / columnCount}
            xl={24 / columnCount}
            key={i}
            className="w-full"
          >
            {itm?.map((elm, j) => (
              <ChildsElement value={elm} key={elm?._id ?? j} />
            ))}
          </Col>
        ))}
      </Row>
    ) : (
      <Row justify="center">
        <Image preview={false} src={images.listEmpty} />
      </Row>
    );
  }, [dataArray, columnCount]);
};

export default memo(Masonry);
