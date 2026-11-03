---
# 예시 글입니다. 실제 리뷰로 바꾸거나 지워주세요.
title: Recommender Systems with Generative Retrieval
date: 2026-10-28
summary: 아이템을 의미 기반 토큰열(semantic ID)로 바꿔두면, 추천을 "후보를 검색해 고르는 문제"가 아니라 "다음 아이템의 ID를 생성하는 문제"로 풀 수 있다.
tags: [RecSys, Semantic ID]
authors: Rajput et al.
venue: NeurIPS 2023
context: 학회 스터디
paperUrl: https://arxiv.org/abs/2305.05065
files: []
---

## 어떤 문제를 푸는가

기존 순차 추천은 사용자와 아이템을 임베딩한 뒤 근사 최근접 탐색으로 후보를 찾는다. 아이템 수만큼 임베딩 테이블이 커지고, 상호작용 기록이 없는 새 아이템은 다루기 어렵다.

## 방법

아이템 텍스트를 사전학습 인코더로 임베딩하고, RQ-VAE로 잔차 양자화해 몇 개의 코드워드 튜플로 만든다. 비슷한 아이템은 앞자리 코드를 공유한다. 그다음 Transformer 인코더-디코더가 사용자의 이전 아이템 ID 시퀀스를 읽고 다음 아이템의 ID를 한 토큰씩 생성한다.

## 내 생각

<!-- 직접 씁니다. 에이전트 초안은 이 섹션을 비워둡니다. -->

## 내 작업과의 연결

이 논문은 [Semantic ID 증강으로 TIGER 확장하기](/projects/tiger-semantic-id/) 프로젝트의 출발점이다.
