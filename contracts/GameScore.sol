// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract GameScores {
    struct Score {
        uint64 startTime;
        uint64 endTime;
        uint64 score;
        uint64 movesDone;
    }

    mapping(address => Score[]) public scores;

    function addScore(uint64 _startTime, uint64 _endTime, uint64 _score, uint64 _movesDone) public {
        scores[msg.sender].push(Score(_startTime, _endTime, _score, _movesDone));
    }

    function getScores(address _player) public view returns (Score[] memory) {
        return scores[_player];
    }
}
