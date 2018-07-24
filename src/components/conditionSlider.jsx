import React from "react";
import { Label } from "office-ui-fabric-react/lib/Label";
import Slider from "react-slick";

export default class ConditionSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionIndex: this.props.conditionIndex
    };
  }

  handleSlideChange(index) {
    this.setState(
      {
        conditionIndex: index
      },
      this.props.onChange(index)
    );
  }

  render() {
    var sliderSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <Slider
          {...sliderSettings}
          afterChange={this.handleSlideChange.bind(this)}
          initialSlide={this.state.conditionIndex}
        >
          <Label className="ms-fontColor-white ms-bgColor-themePrimary">
            AND
          </Label>
          <Label className="ms-fontColor-white ms-bgColor-themePrimary">
            OR
          </Label>
        </Slider>
      </div>
    );
  }
}
