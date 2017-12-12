'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var orderBy = _interopDefault(require('lodash/orderBy'));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var callAll = function callAll() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.forEach(function (fn) {
      return fn && fn.apply(undefined, args);
    });
  };
};

var Relisted = function (_React$Component) {
  _inherits(Relisted, _React$Component);

  function Relisted(props) {
    _classCallCheck(this, Relisted);

    var _this = _possibleConstructorReturn(this, (Relisted.__proto__ || Object.getPrototypeOf(Relisted)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      filterValue: '',
      sortBy: props.sortBy,
      sortAscending: props.sortAscending
    };
    return _this;
  }

  _createClass(Relisted, [{
    key: 'propGetters',
    value: function propGetters() {
      return {
        getColumnProps: this.getColumnProps,
        getFilterProps: this.getFilterProps,
        getClearProps: this.getClearProps,
        filterData: this.filterData,
        sortData: this.sortData,
        sortBy: this.state.sortBy,
        sortAscending: this.state.sortAscending,
        filterValue: this.state.filterValue
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children(this.propGetters());
    }
  }]);

  return Relisted;
}(React.Component);

Relisted.propTypes = {
  children: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
  sortAscending: PropTypes.bool
};
Relisted.defaultProps = {
  sortBy: '',
  sortAscending: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.filterData = function (data, columns) {
    return data.filter(function (row) {
      var keys = columns.map(function (c) {
        return c.name;
      });
      return keys.some(function (key) {
        var check = row[key];
        if (typeof check === 'string') return check.toLowerCase().includes(_this2.state.filterValue.toLowerCase());
        return check === _this2.state.filterValue;
      });
    });
  };

  this.sortData = function (data) {
    return orderBy(data, [_this2.state.sortBy], [_this2.state.sortAscending ? 'asc' : 'desc']);
  };

  this.columnClick = function (columnName) {
    _this2.setState(function (prevState) {
      var state = { sortBy: columnName };
      if (prevState.sortBy === state.sortBy) {
        state.sortAscending = !prevState.sortAscending;
      } else {
        state.sortAscending = true;
      }
      return state;
    });
  };

  this.getColumnProps = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var name = _ref.name,
        rest = _objectWithoutProperties(_ref, ['name']);

    return _extends({}, rest, {
      onClick: callAll(rest.onClick, function () {
        return _this2.columnClick(name);
      })
    });
  };

  this.getFilterProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({
      value: _this2.state.filterValue
    }, props, {
      onChange: callAll(props.onChange, _this2.filterChange)
    });
  };

  this.getClearProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, props, {
      onClick: callAll(props.onClick, _this2.clearFilter)
    });
  };

  this.filterChange = function (evt) {
    _this2.setState({ filterValue: evt.target.value });
  };

  this.clearFilter = function () {
    _this2.setState({ filterValue: '' });
  };
};

module.exports = Relisted;
