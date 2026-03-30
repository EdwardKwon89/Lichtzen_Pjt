# Antigravity Guide for Lichtzen Home Ver 2.0

이 문서는 AI 에이전트(Antigravity)가 리트젠 홈 버전 2.0 프로젝트를 수행할 때 지켜야 할 핵심 지침입니다.

## 📜 일반 원칙 (General Principles)
- **언어**: 모든 소통과 문서는 **한국어**를 원칙으로 한다. (사용자 지정 규칙)
- **보안**: 기밀 유지를 위해 **원격 저장소(Remote Push)를 금지**하며, 오직 로컬(`WorkSpace/Lichtzen_Home`)에서만 작업한다.
- **AI-Native 관리**: 프로젝트의 상태와 로드맵은 `.planning/` 내의 GSD 문서를 최우선 기준으로 삼는다.

## 🛡️ 기술적 가이드라인 (Technical Guidelines)
- **프레임워크**: Next.js 14+ (App Router) / React 18 / Tailwind CSS v4.
- **디자인**: "The Precision of Light" 브랜드 아이덴티티를 위해 Deep Navy(#0A0E1A)와 Electric Violet(#8B5CF6)을 주력으로 사용한다.
- **검증**: 코드 변경 후 반드시 빌드나 컴파일 검증을 통해 `BUILD SUCCESS`를 확인한 뒤 보고한다.
- **SEO**: 모든 페이지의 메타 태그, 시맨틱 HTML, 유니크 ID 설정을 필수적으로 수행한다.

## 📁 주요 워크플로우 (Workflows)
1.  **작업 시작 전**: `.planning/ROADMAP.md`와 `.planning/STATE.md`를 읽어 현재 위치를 파악한다.
2.  **작업 중**: 로직 변경 시나 기획 수정 시 관련 `.planning/` 문서를 동시 업데이트한다.
3.  **작업 완료 후**: 변경 사항을 요약한 `walkthrough.md`를 기획 의도에 맞게 작성하여 보고한다.

## 🚫 금지 사항 (Prohibited)
- `cd` 명령어 사용 금지 (환경 제약).
- 외부 저장소(Origin)로의 강제 Push 금지.
- `/tmp/` 이외의 워크스페이스 외부 파일 생성 금지.

---
*이 가이드는 GSD(Get-Sgit-Done) 프레임워크와 연동되어 프로젝트의 지속적 가용성과 품질을 보장합니다.*
