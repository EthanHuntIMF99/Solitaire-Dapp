// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract GameScores {
    struct Score {
        uint256 startTime;
        uint256 endTime;
        uint256 score;
    }

    mapping(address => Score[]) public scores;

    function addScore(uint256 _startTime, uint256 _endTime, uint256 _score) public {
        scores[msg.sender].push(Score(_startTime, _endTime, _score));
    }

    function getScores(address _player) public view returns (Score[] memory) {
        return scores[_player];
    }
}
